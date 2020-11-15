import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Orphanage from './Orphanage'

@Entity('images')
export default class Image {
  // Tipos de variavel no js. Não tem a ver com bd.
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column() // Cada um representa uma column no bd
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage
}


  
  // OBS.: Caso não tenha column é só não colocar o @Column()