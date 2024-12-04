/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const FavoritesLazyImport = createFileRoute('/favorites')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const FavoritesLazyRoute = FavoritesLazyImport.update({
  id: '/favorites',
  path: '/favorites',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/favorites.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/favorites': {
      id: '/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof FavoritesLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/favorites': typeof FavoritesLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/favorites': typeof FavoritesLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/favorites': typeof FavoritesLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/favorites'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/favorites'
  id: '__root__' | '/' | '/favorites'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  FavoritesLazyRoute: typeof FavoritesLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  FavoritesLazyRoute: FavoritesLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/favorites"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/favorites": {
      "filePath": "favorites.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
