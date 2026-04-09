declare module "animejs" {
  interface AnimeParams {
    targets?: unknown;
    [key: string]: unknown;
  }
  function anime(params: AnimeParams): unknown;
  export default anime;
}
