export async function fetchJSON<T>(url: string): Promise<T>{
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Error de HTTP: ${response.status}`);
    }

    return response.json() as Promise<T>
}