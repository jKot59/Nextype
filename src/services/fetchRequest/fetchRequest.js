async function fetchRequest (url) {
    const res = await fetch(url)

    //обработаем ошибку
    if(!res.ok) {
        throw new Error(`Fetch to ${url} has status ${res.status}`)
    } 

    // вернем promise
    return await res.json()
}

export default fetchRequest