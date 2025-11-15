declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.css?url" {
  const url: string;
  export default url;
}

declare module "@/global.css?url" {
  const url: string;
  export default url;
}
