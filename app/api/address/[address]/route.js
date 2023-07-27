import alchemy from "../../alchemy.js";

export async function GET(request, { params }) {
  try {
    console.log(params);
    const { address } = params;
    return new Response(JSON.stringify({ address: address }));
  } catch (err) {
    console.log("err", err);
  }
}
