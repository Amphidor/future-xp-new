import UserEditClient from "./UserEditClient";

// Required for static export (ZIP deploy); one placeholder so route is valid
export async function generateStaticParams() {
  return [{ id: "0" }];
}

export default function UserEditPage() {
  return <UserEditClient />;
}
