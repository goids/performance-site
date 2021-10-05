const h = require('hyperscript')
const { fetchPopular, fetchHighestRated, fetchTrending } = require('./api')
const CarouselItem = require('./CarouselItem')

async function render() {
  const [trending, popular, highestRated] = await Promise.all([
    fetchTrending(),
    fetchPopular(),
    fetchHighestRated(),
  ])

  const html = h(
    'section',
    SectionTitle('Treding Anime'),
    Carousel({
      itemList: trending,
    }),
    SectionTitle('Highest Rated Anime'),
    Carousel({
      itemList: highestRated,
    }),
    SectionTitle('Most Popular Anime'),
    Carousel({
      itemList: popular,
    })
  )

  const htmlText = html.innerHTML

  return htmlText
}

const SectionTitle = title => h('h3.carousel__title', title)

const Carousel = ({ itemList = [] }) =>
  h(
    'section.carousel',
    h(
      'div.carousel__container',
      itemList.map(
        ({
          attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
        }) =>
          CarouselItem({
            imageUrl: posterImage.medium,
            title: titles.en,
            subtitle: titles.ja_jp,
            slug,
            youtubeVideoId,
            startDate,
          })
      )
    )
  )

module.exports = render
