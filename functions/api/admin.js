export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const { adminKey, isVisible, quizPassword } = body;

        // Hardcoded admin key for simplicity
        const MASTER_ADMIN_KEY = "super_secret_admin_key_123";

        if (adminKey !== MASTER_ADMIN_KEY) {
            return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await context.env.DB.prepare(
            "UPDATE settings SET is_visible = ?, quiz_password = ?"
        ).bind(isVisible ? 1 : 0, quizPassword).run();

        return Response.json({ success: true });
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}