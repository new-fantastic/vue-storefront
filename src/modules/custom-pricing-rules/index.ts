import { module } from "./store";
import { createModule } from "@vue-storefront/core/lib/module";
import { afterRegistration } from "./hooks/afterRegistration";

export const KEY = "custom-pricing-rules";

export const CustomPricingRules = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  afterRegistration
});
