import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService, User } from '@stack-v4160/web/core/data-access'
import { pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators'

export interface UserPasswordState {
  errors?: any
  loading?: boolean
  user?: User
}

@Injectable()
export class AdminUserPasswordStore extends ComponentStore<UserPasswordState> {
  constructor(private readonly data: WebCoreDataAccessService, route: ActivatedRoute) {
    super({ loading: false })
    this.loadUserEffect(route.params.pipe(pluck('userId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly user$ = this.select((s) => s.user)
  readonly vm$ = this.select(this.errors$, this.loading$, this.user$, (errors, loading, user) => ({
    errors,
    loading,
    user: { ...user },
  }))

  readonly loadUserEffect = this.effect<string>((userId$) =>
    userId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userId) =>
        this.data.adminUser({ userId }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                user: res.data.adminUser,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateSetUserPasswordEffect = this.effect<string>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.user$),
      switchMap(([password, user]) =>
        this.data.adminSetUserPassword({ password, userId: user.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                user: res.data.adminSetUserPassword,
                errors: res.errors,
                loading: false,
              })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )
}
