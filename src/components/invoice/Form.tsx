export default function Page() {
  // Action
  async function create(formData: FormData) {
    "use server";
    const username = formData.get("username");
    console.log(username);
    // Logic to mutate data...
  }

  // Invoke the action using the "action" attribute
  return (
    <form action={create}>
      <input type="text" name="username" />
      <button type="submit">Request</button>
    </form>
  );
}
