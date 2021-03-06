import { Component, OnInit } from '@angular/core'
import { AccountUpdateProfileInput } from '@stack-v4160/web/core/data-access'
import { AccountProfileStore } from './account-profile.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.loading">
        <div class="flex py-4 justify-center items-center shadow rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 md:mb-6">
          <ui-loader></ui-loader>
        </div>
      </ng-container>
      <ng-container *ngIf="vm.errors">
        <div class="p-4 shadow rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 md:mb-6">
          <div class="font-semibold">An error occurred:</div>
          <pre class="text-red-700">{{ vm.errors }}</pre>
        </div>
      </ng-container>
      <ng-container *ngIf="vm.profile">
        <div class="flex flex-col space-y-3 md:space-y-6">
          <div class="flex flex-col shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="px-4 py-2 dark:bg-gray-700 flex items-center font-semibold">Profile</div>
            <div class="p-4">
              <account-profile-form [user]="vm.profile" (send)="updateProfile($event)"></account-profile-form>
            </div>
          </div>
          <div class="flex flex-col shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="px-4 py-2 dark:bg-gray-700 flex items-center font-semibold">Username</div>
            <div class="p-4">
              <account-username-form [user]="vm.profile" (send)="updateUsername($event)"></account-username-form>
            </div>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [AccountProfileStore],
})
export class AccountProfileComponent implements OnInit {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AccountProfileStore) {}

  updateProfile(input: AccountUpdateProfileInput) {
    this.store.updateProfileEffect(input)
  }

  updateUsername({ username }) {
    this.store.updateUsernameEffect(username)
  }

  ngOnInit(): void {
    this.store.loadProfileEffect()
  }
}
