export function genArtistisText(artists) {
    return (artists || []).map(([name]) => name.join('/'))
}
