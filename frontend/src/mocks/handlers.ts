import { rest } from 'msw'

export const handlers = [
  rest.get('/v1/search/google/01', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='search'><div class='g'><div class='r'><a href='http://www.infotrack.com'/></div></div></div>")
    )
  }),

  rest.get('/v1/search/google/02', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='search'><div class='g'><div class='r'><a href='http://infotrack.com'/></div></div></div>")
    )
  }),

  rest.get('/v1/search/google/03', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='search'><div class='g'><div class='r'><a href='http://www.infotrack.com'/></div></div></div>")
    )
  }),

  rest.get('/v1/search/google/04', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='search'><div class='g'><div class='r'><a href='http://www.infotrack.com'/></div></div></div>")
    )
  }),

  rest.get('/v1/search/google/05', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='search'><div class='g'><div class='r'><a href='http://www.infotrack.com'/></div></div></div>")
    )
  }),

  rest.get('/v1/search/google/06', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='search'><div class='g'><div class='r'><a href='http://www.infotrack.com'/></div></div></div>")
    )
  }),

  rest.get('/v1/search/bing/01', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='b_results'><li class='b_algo'><h2><a href='http://www.sydney.com'/></h2></li></div>")
    )
  }),

  rest.get('/v1/search/bing/02', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='b_results'><li class='b_algo'><h2><a href='http://www.harry.com'/></h2></li></div>")
    )
  }),

  rest.get('/v1/search/bing/03', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='b_results'><li class='b_algo'><h2><a href='http://www.infotrack.com'/></h2></li></div>")
    )
  }),

  rest.get('/v1/search/bing/04', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='b_results'><li class='b_algo'><h2><a href='http://www.infotrack.com'/></h2></li></div>")
    )
  }),

  rest.get('/v1/search/bing/05', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='b_results'><li class='b_algo'><h2><a href='http://www.infotrack.com'/></h2></li></div>")
    )
  }),

  rest.get('/v1/search/bing/06', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.text("<div id='b_results'><li class='b_algo'><h2><a href='http://www.nsw.com'/></h2></li></div>")
    )
  }),
]
