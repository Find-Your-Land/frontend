import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Artist, ArtistFilter } from 'src/app/models/artist.model';
import { LoaderService } from 'src/app/services/loader.service';
import { ArtistService } from 'src/app/services/artist.service';
import { faList, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit, OnDestroy {
  @ViewChild('elFooter') elFooter: any

  constructor(
    private artistService: ArtistService,
    public loader: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  artists$ !: Observable<Artist[]> | null
  isShowScroller: boolean = false
  subscription!: Subscription
  isShowClearBtn: boolean = false
  artistLoadIndex: number = 1
  artistFullLength: number = 0
  isLoadArtist: boolean = false
  subscriptionArtistLength!: Subscription
  isShowMap:boolean = false
  listIcon = faList
  mapIcon = faMapLocationDot

  async ngOnInit() {
    this.subscriptionArtistLength = this.artistService.artistLength$.subscribe(artistLength => {
      this.artistFullLength = artistLength
      this.artistLoadIndex = 1
    })

    this.loader.setLoading(true)
    await this.setFilterFromParams()
    this.loader.setLoading(false)
    this.artists$ = this.artistService.artists$
    window.addEventListener('scroll', () => this.onScroll())

    this.subscription = this.artistService.artistFilter$.subscribe(artistFilter => {
      this.isShowClearBtn = this.checkIfClearFilter(artistFilter)
    })
  }

  async onPageScroll() {
    const element = this.elFooter.nativeElement
    if (element.clientHeight + element.offsetTop <= window.scrollY + window.innerHeight && !this.isShowMap) {
      if (this.artistFullLength > this.artistLoadIndex * 20 && !this.isLoadArtist) {
        this.isLoadArtist = true
        this.loader.setLoading(true)
        await this.artistService.loadArtists(this.artistLoadIndex)
        this.isLoadArtist = false
        this.loader.setLoading(false)
        this.artistLoadIndex++
      }
    }
  }

  async setFilterFromParams() {
    const artistFilter = {
      ...this.artistService.getEmptyFilter(),
      ...this.activatedRoute.snapshot.queryParams as ArtistFilter
    }
    await this.artistService.setFilterAsync(artistFilter)
  }

  onPageUp() {
    window.scrollTo(0, 0)
  }

  onScroll() {
    if (window.scrollY >= 150) {
      this.isShowScroller = true
    } else {
      this.isShowScroller = false
    }
  }

  async onClearFilter() {
    this.loader.setLoading(true)
    const filter = this.artistService.getEmptyFilter()
    await this.artistService.setFilterAsync(filter)
    this.loader.setLoading(false)
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: filter,
        queryParamsHandling: 'merge'
      }
    )
  }

  checkIfClearFilter(artistFilter: ArtistFilter): boolean {
    if (artistFilter.place || artistFilter.label || artistFilter.isPetAllowed === 'true') return true
    return false
  }

  get IsShowMapBtn() {
    return this.artistFullLength
    && !this.loader.getLoading()
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', () => this.onScroll())
  }

}
