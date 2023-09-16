import { Component, Input } from '@angular/core';
import { Guest, Order } from 'src/app/models/order.model';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ArtistFilter } from 'src/app/models/artist.model';

@Component({
  selector: 'artist-header-filter-guest-modal',
  templateUrl: './artist-header-filter-guest-modal.component.html',
  styleUrls: ['./artist-header-filter-guest-modal.component.scss']
})
export class ArtistHeaderFilterGuestModalComponent {
  @Input() order !: Order
  @Input() artistFilter!: ArtistFilter
  faCirclePlus = faCirclePlus
  faCircleMinus = faCircleMinus

  get Guests() {
    const guests = []
    let key: keyof Guest
    for (key in this.order.guests) {
      guests.push({ type: key, amount: this.order.guests[key] })
    }
    return guests
  }

  GuestTypeSubTitle(guestType: keyof Guest) {
    if(guestType === 'adults') return 'Ages 13 or above'
    if(guestType === 'children') return 'Ages 2–12'
    if(guestType === 'infants') return 'Under 2'
    return 'Bringing a service animal?'
  }

  checkMinusBtn(guestType: keyof Guest) {
    if (guestType === 'adults') return this.order.guests.adults > 1
    return this.order.guests[guestType] > 0
  }

  checkPlusBtn(guestType: string) {
    if (guestType === 'adults' || guestType === 'children') {
      return this.order.guests.adults + this.order.guests.children < 16
    }
    if (guestType === 'infants') return this.order.guests.infants < 5
    if (guestType === 'pets') return this.order.guests.pets < 3
    return false
  }

  onAddGuests(guestType: keyof Guest, diff: number) {
    this.order.guests[guestType] += diff
    if(guestType === 'pets') {
      if(this.order.guests.pets > 0)  this.artistFilter.isPetAllowed = 'true'
      else this.artistFilter.isPetAllowed = 'false'
    }
  }
}
