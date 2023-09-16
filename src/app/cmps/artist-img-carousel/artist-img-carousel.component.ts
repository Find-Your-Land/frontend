import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleRight, faAngleLeft, faHeart, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'artist-img-carousel',
  templateUrl: './artist-img-carousel.component.html',
  styleUrls: ['./artist-img-carousel.component.scss']
})
export class ArtistImgCarouselComponent implements OnInit {
  constructor(
    private artistService: ArtistService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  @Input() artist !: Artist
  isLikeByUser: boolean = false
  faAngleRight = faAngleRight
  faAngleLeft = faAngleLeft
  faHeart = faHeart
  faCircle = faCircle
  currIdx = 0

  ngOnInit() {
    this.isLikeActive()
  }

  onClickArrow(ev: Event, diff: number) {
    ev.stopPropagation()
    this.currIdx += diff
  }

  get IsShowLike() {
    return !this.activatedRoute?.snapshot?.params['artistId']
  }


  checkRightArrow() {
    return this.currIdx < (this.artist.imgUrls.length - 1)
  }

  setCurrIdx(ev: Event, idx: number) {
    ev.stopPropagation()
    this.currIdx = idx
  }

  getClassPagination(idx: number) {
    return this.currIdx === idx ? 'active' : ''
  }

  isUserPage() {
    return this.router.url.includes('user')
  }

  isLikeActive() {
    const user = this.userService.getUser()
    if (!user) this.isLikeByUser = false
    else this.isLikeByUser = this.artist.likedByUsers.includes(user._id)
  }

  async onClickLike(ev: Event) {
    ev.stopPropagation()
    try {
      const user = this.userService.getUser()
      if (!user) this.snackBar.open('Por favor, primeiro faca o login', 'Close', { duration: 3000 })
      else {
        if (this.isLikeByUser) this.artist.likedByUsers = this.artist.likedByUsers.filter(userId => userId !== user._id)
        else this.artist.likedByUsers.push(user._id)
        this.artist = await this.artistService.save(this.artist) as Artist
        this.isLikeByUser = !this.isLikeByUser
        const msg = this.isLikeByUser ? 'Artist added to wishlist' : 'Artist removed from wishlist'
        if (this.isUserPage()) this.artistService.loadArtists()
        this.snackBar.open(msg, 'Close', { duration: 3000 })
      }
    } catch (err) {
      console.log('err:', err)
    }
  }
}
