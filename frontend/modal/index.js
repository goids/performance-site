export const modalListener = event => {
  event.preventDefault()
  const parent = event.target
  const link = parent.parentElement
  const videoID = link.dataset.videoId

  if (link && link.classList.contains('js-video-link')) {
    import(/* webpackChunkName: "modal" */ './openModal').then(
      ({ openModal }) => {
        openModal(videoID)
      }
    )
  }
}
