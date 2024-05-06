import { userData } from "@/data/userData";
import generateRandomId from "@/utils/generateRandomId";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const filteredData = userData.filter(
    (item) => item.id.toString() === params.id.toString()
  );

  if (filteredData.length !== 0) {
    return Response.json(filteredData);
  } else {
    return Response.json({
      message: "no data found",
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id.toString() === params.id.toString()) {
      userData.splice(i, 1);
      break; // Hentikan loop setelah item dihapus
    }
  }

  return Response.json(userData);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const newData = {
    id: params.id,
    ...await request.json()
  }

  // check is id data exist
  let idDataExist = false
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id.toString() === params.id.toString()) {
      idDataExist = true
      userData[i] = { ...userData[i], ...newData };
      break; // Hentikan loop setelah item dihapus
    }
  }

  if (idDataExist) {
    return Response.json(userData);
  } else {
    return Response.json({msg: "id data is not exist"});
  }
}
