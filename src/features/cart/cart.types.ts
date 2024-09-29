import { getProductVariants } from '../../services/apiProducts';

export type TCartList = Awaited<ReturnType<typeof getProductVariants>>;
