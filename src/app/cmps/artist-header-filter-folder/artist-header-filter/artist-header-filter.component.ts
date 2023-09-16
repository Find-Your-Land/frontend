import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
import { CalendarOptions } from 'ngx-airbnb-calendar';
import { ArtistFilter } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artist.service';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'artist-header-filter',
  templateUrl: './artist-header-filter.component.html',
  styleUrls: ['./artist-header-filter.component.scss']
})
export class ArtistHeaderFilterComponent implements OnInit, OnDestroy {
  @Input() isHeaderFilterActive!: boolean
  @Output() toggleHeaderFilter = new EventEmitter<void>()

  constructor(
    private orderService: OrderService,
    private artistService: ArtistService,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  faMagnifyingGlass = faMagnifyingGlass
  modalNav = ''
  searchFilter = ''
  order !: Order
  subscriptionOrder!: Subscription
  subscriptionArtistFilter!: Subscription
  date: string | null = null
  isBlur: boolean = false
  artistFilter!: ArtistFilter

  options: CalendarOptions = {
    format: "yyyy/LL/dd",
    formatDays: "eeeeee",
    firstCalendarDay: 1,
    closeOnSelected: false,
  }

  ngOnInit() {
    this.subscriptionOrder = this.orderService.order$.subscribe(order => this.order = order)
    this.subscriptionArtistFilter = this.artistService.artistFilter$.subscribe(artistFilter => this.artistFilter = artistFilter)
    this.date = this.dateFromOrder
  }

  get Anywhere() {
    return this.artistFilter.place ? this.artistFilter.place : 'stay.header.anywhere'
  }

  get AnyWeek() {
    if (!this.order.startDate || !this.order.endDate || !this.date) return 'stay.header.anyweek'
    if (this.order.startDate.getMonth() === this.order.endDate.getMonth()) {
      const monthName = this.utilService.getMonthName(this.order.endDate.getMilliseconds())
      return `${monthName} ${this.order.startDate.getDate()} - ${this.order.endDate.getDate()}`
    }
    const month1 = this.utilService.getMonthName(this.order.endDate.getMilliseconds())
    const month2 = this.utilService.getMonthName(this.order.endDate.getMilliseconds())
    return `${month1} ${this.order.startDate.getDate()} - ${month2} ${this.order.endDate.getDate()}  `
  }

  // SERVICE
  get AddGuest() {
    const guests = this.order.guests
    if (guests.adults === 1 && guests.children === 0 && guests.infants === 0 && guests.pets === 0) return 'Proprietario'
    return this.getGuests()
  }

  onToggleHeaderFilter() {
    this.toggleHeaderFilter.emit()
  }

  setModalNav(val: string) {
    this.modalNav = val
  }

  onSetWhereSearch(val: string) {
    this.searchFilter = val
    if (val) this.setModalNav('search-place-modal')
    else this.setModalNav('region-modal')
  }

  onClickDate(val: string) {
    this.modalNav = val
  }

  onClickGuests(val: string) {
    this.setModalNav(val)
  }

  onClickSearch() {
    this.orderService.setOrder(this.order)
    this.artistService.setFilter(this.artistFilter)
    this.applyFilterToRoute(this.artistFilter)
    this.onToggleHeaderFilter()
  }

  get dateFromOrder() {
    if (!this.order.startDate.getMilliseconds() || !this.order.endDate.getMilliseconds()) return ''
    return this.order.startDate.toDateString() + '-' + this.order.endDate.toDateString()
  }

  getGuests() {
    let str = this.order.guests.adults + this.order.guests.children > 0 ? (this.order.guests.adults + this.order.guests.children) + ' guests ' : ''
    str += this.order.guests.infants > 0 ? ' ,' + this.order.guests.infants + ' infants ' : ''
    str += this.order.guests.pets > 0 ? ' ,' + this.order.guests.pets + ' pets ' : ''
    return str
  }

  getCheckIn() {
    if (this.date) {
      const dates = this.date?.split('-')
      if (dates.length >= 1) {
        this.order.startDate = new Date(dates[0])
        return new Date(dates[0])
      }
    }
    return
  }

  getCheckOut() {
    if (this.date) {
      const dates = this.date?.split('-')
      if (dates.length === 2) {
        this.order.endDate = new Date(dates[1])
        return new Date(dates[1])
      }
    }
    return
  }

  setSearchFilter(place: string) {
    this.searchFilter = place
  }

  private applyFilterToRoute(filter: ArtistFilter): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: filter,
        queryParamsHandling: 'merge'
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionOrder.unsubscribe()
    this.subscriptionArtistFilter.unsubscribe()
  }
}
