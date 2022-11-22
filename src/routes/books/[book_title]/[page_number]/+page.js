export async function load({ params }) {
    let book_title = params.book_title
    let page_number = params.page_number
    return {
    book_title: book_title,
    page_number: page_number
}
}
