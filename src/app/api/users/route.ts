import { userData } from "@/data/userData";
import generateRandomId from "@/utils/generateRandomId";

export async function GET(request: Request) {
  return Response.json(userData);
}

export async function POST(request: Request) {
  const newData = {
    id: generateRandomId(),
    ...await request.json()
  }
  userData.push(newData)

  return Response.json(userData);
}
