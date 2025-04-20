// playground/index.ts
import { createHison } from "hisonjs"; 
const hison = createHison();

function main() {
  console.log("=== Playground Start ===");

  console.log("hison object:", hison);

  const isNumber = hison.utils.isNumber("12345");
  console.log("isNumber('12345'):", isNumber); // true

  const wrapper = new hison.data.DataWrapper({ key: "value" });
  console.log("DataWrapper getString:", wrapper.getString("key"));

  console.log("=== Playground End ===");
}

main();