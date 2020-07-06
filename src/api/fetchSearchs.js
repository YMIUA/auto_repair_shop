const types = [
    'terms',
    'brands_terms',
    'styles'
]

const requests = types.map(type => 
    fetch(`https://beta.autobooking.com/api/test/v1/search/${type}`).then(response => response.json()).then((response)=> ({
        type,
        data: response.data
    }))
);

export default async () => {
    return Promise
    .all(requests)
}