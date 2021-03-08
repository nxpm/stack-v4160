import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { SvgIconsModule } from '@ngneat/svg-icon'

import { MobileCoreFeatureGraphQLModule } from './mobile-core-feature-graphql.module'

@NgModule({
  imports: [HttpClientModule, MobileCoreFeatureGraphQLModule, SvgIconsModule.forRoot()],
})
export class MobileCoreFeatureModule {}
