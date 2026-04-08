export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { password } = body;

        const { results } = await context.env.DB.prepare(
            "SELECT quiz_password FROM settings ORDER BY id DESC LIMIT 1"
        ).all();

        const correctPassword = results.length > 0 ? results[0].quiz_password : "";

        if (password === correctPassword) {
            return Response.json({ success: true });
        } else {
            return Response.json({ success: false, error: "Incorrect password" }, { status: 401 });
        }
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}