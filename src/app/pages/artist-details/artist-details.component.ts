import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StatReviews, Artist } from 'src/app/models/artist.model';
import { faArrowUpFromBracket, faHeart, faStar, faCircle } from '@fortawesome/free-solid-svg-icons'
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ArtistService } from 'src/app/services/artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('element') element: any;

  constructor(
    private renderer2: Renderer2,
    private route: ActivatedRoute,
    private userService: UserService,
    private artistService: ArtistService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private viewportScroller: ViewportScroller) { }

  unlistener !: () => void
  user!: User
  artist!: Artist
  order !: Order
  artistSubscription!: Subscription
  orderSubscription!: Subscription
  shareIcon = faArrowUpFromBracket
  heartIcon = faHeart
  starIcon = faStar
  point = faCircle
  isShowHeader: boolean = false
  isShowHeaderOrder: boolean = false
  isReserveClick: boolean = false
  isLikeByUser: boolean = false

  ngOnInit(): void {
    this.orderSubscription = this.orderService.order$.subscribe(order => this.order = order)
    this.artistSubscription = this.route.data.subscribe(data => {
      this.artist = data['artist']
    })
    this.user = this.userService.getUser()
    this.isLikeActive()
  }

  scrollTo(nav: string) {
    this.viewportScroller.scrollToAnchor(nav)
  }

  setIsReserveClick(val: boolean) {
    this.isReserveClick = val
  }

  ngAfterViewInit(): void {
    this.unlistener = this.renderer2.listen('window', 'scroll', () => this.onScroll(this.element))
  }

  onScroll(element: ElementRef) {
    if (window.scrollY >= element.nativeElement.offsetTop) this.isShowHeader = true
    else this.isShowHeader = false
    if (window.scrollY >= 1378) this.isShowHeaderOrder = true
    else this.isShowHeaderOrder = false
  }

  getRateAvg() {
    let rate = 0
    let key: keyof StatReviews
    for (key in this.artist.statReviews) {
      rate += this.artist.statReviews[key]
    }

    return (rate / 6).toFixed(2)
  }

  isLikeActive() {
    if (!this.user) this.isLikeByUser = false
    else this.isLikeByUser = this.artist.likedByUsers.includes(this.user._id)
  }

  async onClickLike(ev: Event) {
    ev.stopPropagation()
    try {
      if (!this.user) this.snackBar.open('Por favor, primeiro faca o login', 'Close', { duration: 3000 })
      else {
        if (this.isLikeByUser) this.artist.likedByUsers = this.artist.likedByUsers.filter(userId => userId !== this.user._id)
        else this.artist.likedByUsers.push(this.user._id)
        this.artist = await this.artistService.save(this.artist) as Artist
        this.isLikeByUser = !this.isLikeByUser
        const msg = this.isLikeByUser ? 'Artist added to wishlist' : 'Artist removed from wishlist'
        this.snackBar.open(msg, 'Close', { duration: 3000 })
      }
    } catch (err) {
      console.log('err:', err)
    }
  }

  addOrder() {
    const user = this.userService.getUser()
    if (!user) this.snackBar.open('Por favor, primeiro faca o login', 'Close', { duration: 3000 })
    else {
      this.order.host._id = this.artist.host._id
      this.order.host.fullname = this.artist.host.fullname
      this.order.buyer = { _id: user._id, fullname: user.fullname }
      this.order.totalPrice = this.TotalPrice
      this.order.artist = { _id: this.artist._id, name: this.artist.name, price: this.artist.price }
      this.isReserveClick = true
    }
  }

  get TotalPrice() {
    const price = +this.artist.price * (this.order.endDate.getDate() - this.order.startDate.getDate())
    const cleanTax = +(price * 0.10).toFixed()
    const serviceFee = +(price * 0.17).toFixed()
    return (price + cleanTax + serviceFee)
  }

  onClickShare() {
    navigator.clipboard.writeText(window.location.href)
    this.snackBar.open('copy to clipboard', 'Close', { duration: 3000 })
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe()
    this.orderSubscription.unsubscribe()
    this.unlistener()
  }
}
