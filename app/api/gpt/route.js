export const GET = async (request) => {
    try {
        return new Response(JSON.stringify({
            message: "Olá mundo"
        }), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch data", { status: 500 })
    }
} 