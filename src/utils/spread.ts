export const spreadFunction = (
  setFunction: any,
  params: any,
  value: any,
  productId?: string,
) => {
  setFunction((prev: any) => [
    ...prev,
    {
      [params]: value,
      productId,
    },
  ])
}
