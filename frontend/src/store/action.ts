import type { History } from 'history';
import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  UserAuth,
  Offer,
  Comment,
  CommentAuth,
  FavoriteAuth,
  UserRegister,
  NewOffer,
} from '../types/types';
import { ApiRoute, AppRoute, HttpCode } from '../const';
import { Token } from '../utils';
import {
  adaptCommentsToClient,
  adaptCommentToClient,
  adaptOfferToClient,
  adaptOffersToClient,
} from '../adapters/adapters-to-client';
import {
  adaptNewOfferToServer,
  adaptSignupToServer,
} from '../adapters/adapters-to-server';

import { OfferDto } from '../dto/offer/offer.dto';
import { CommentDto } from '../dto/comment/comment.dto';
import { UserDto } from '../dto/user/user.dto';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_PREMIUM_OFFERS: 'offers/fetch-premium',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  POST_FAVORITE: 'offer/post-favorite',
  DELETE_FAVORITE: 'offer/delete-favorite',
  LOGIN_USER: 'users/login',
  LOGOUT_USER: 'users/logout',
  FETCH_USER_STATUS: 'users/fetch-status',
  REGISTER_USER: 'users/register',
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: Extra }
>(Action.FETCH_OFFERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferDto[]>(ApiRoute.Offers);

  return adaptOffersToClient(data);
});

export const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: Extra }
>(Action.FETCH_FAVORITE_OFFERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferDto[]>(ApiRoute.Favorite);

  return adaptOffersToClient(data);
});

export const fetchOffer = createAsyncThunk<
  Offer,
  Offer['id'],
  { extra: Extra }
>(Action.FETCH_OFFER, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<OfferDto>(`${ApiRoute.Offers}/${id}`);

    return adaptOfferToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NotFound) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});

export const postOffer = createAsyncThunk<Offer, NewOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<OfferDto>(
      ApiRoute.Offers,
      adaptNewOfferToServer(newOffer)
    );
    history.push(`${AppRoute.Property}/${data.id}`);

    return adaptOfferToClient(data);
  }
);

export const editOffer = createAsyncThunk<Offer, Offer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<OfferDto>(
      `${ApiRoute.Offers}/${offer.id}`,
      offer
    );
    history.push(`${AppRoute.Property}/${data.id}`);

    return adaptOfferToClient(data);
  }
);

export const deleteOffer = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Offers}/${id}`);
    history.push(AppRoute.Root);
  }
);

export const fetchPremiumOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: Extra }
>(Action.FETCH_PREMIUM_OFFERS, async (cityName, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferDto[]>(
    `${ApiRoute.Premium}?city=${cityName}`
  );

  return adaptOffersToClient(data);
});

export const fetchComments = createAsyncThunk<
  Comment[],
  Offer['id'],
  { extra: Extra }
>(Action.FETCH_COMMENTS, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<CommentDto[]>(
    `${ApiRoute.Offers}/${id}${ApiRoute.Comments}`
  );

  return adaptCommentsToClient(data);
});

export const fetchUserStatus = createAsyncThunk<
  UserAuth['email'],
  undefined,
  { extra: Extra }
>(Action.FETCH_USER_STATUS, async (_, { extra }) => {
  const { api } = extra;

  try {
    const { data } = await api.get<UserDto>(ApiRoute.Login);

    return data.email;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      Token.drop();
    }

    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<
  UserAuth['email'],
  UserAuth,
  { extra: Extra }
>(Action.LOGIN_USER, async ({ email, password }, { extra }) => {
  const { api, history } = extra;
  const { data } = await api.post<UserDto & { token: string }>(ApiRoute.Login, {
    email,
    password,
  });
  const { token } = data;

  Token.save(token);
  history.push(AppRoute.Root);

  return email;
});

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    await api.delete(ApiRoute.Logout);

    Token.drop();
  }
);

export const registerUser = createAsyncThunk<
  void,
  UserRegister,
  { extra: Extra }
>(
  Action.REGISTER_USER,
  async ({ email, password, name, avatar, type }, { extra }) => {
    const { api, history } = extra;
    const body = adaptSignupToServer({
      email,
      password,
      name,
      type,
    });
    const { data } = await api.post<{ id: string }>(ApiRoute.Register, body);
    if (avatar) {
      const payload = new FormData();
      payload.append('avatar', avatar);
      await api.post(`/${data.id}${ApiRoute.Avatar}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    history.push(AppRoute.Login);
  }
);

export const postComment = createAsyncThunk<
  Comment,
  CommentAuth,
  { extra: Extra }
>(Action.POST_COMMENT, async ({ id, comment, rating }, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<CommentDto>(
    `${ApiRoute.Offers}/${id}${ApiRoute.Comments}`,
    { comment, rating }
  );

  return adaptCommentToClient(data);
});

export const postFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.POST_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferDto>(`${ApiRoute.Favorite}/${id}`);

    return adaptOfferToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});

export const deleteFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.DELETE_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.delete<OfferDto>(`${ApiRoute.Favorite}/${id}`);

    return adaptOfferToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NoAuth) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});
