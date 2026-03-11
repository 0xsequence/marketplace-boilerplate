declare module 'quikdown' {
  interface QuikdownOptions {
    inline_styles?: boolean;
    lazy_linefeeds?: boolean;
    bidirectional?: boolean;
    allow_unsafe_urls?: boolean;
  }

  function quikdown(markdown: string, options?: QuikdownOptions): string;

  export = quikdown;
}
