import Image from '../models/Image'

export default {
  render(image: Image) { // Vai exibir o orfanato na maneira que queremos pro front-end
    return { // retorna os dados pro front-end
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}` // para retonar o endereço da img.
    }
  },

  renderMany(images: Image[]) { // Para muitos orphanatos
    return images.map(image => this.render(image)) // chama os orfanatos e retorna para orphanage
  }
}