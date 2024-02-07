declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.png' {
    const content: any;
    export default content;
}

declare module '*.scss' {
    const content: any;
    export default content;
}

declare module "lodash.debounce" {
    function debounce<F extends Function>(func: F, wait?: number, immediate?: boolean): F;
    namespace debounce {}
    export = debounce;
  }