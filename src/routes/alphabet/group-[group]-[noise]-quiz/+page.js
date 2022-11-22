export async function load({ params }) {
let noise = params.noise
let group = params.group
return {
noise: noise,
group: group
}
}
