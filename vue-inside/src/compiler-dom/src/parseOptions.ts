import {
  TextModes,
  ParserOptions,
  ElementNode,
  NodeTypes,
  isBuiltInType
} from '@vue/compiler-core'
import { TRANSITION, TRANSITION_GROUP } from './runtimeHelpers'
import { makeMap, isVoidTag, isHTMLTag, isSVGTag } from '@vue/shared'
import { decodeHtml } from './decodeHtml'
import { decodeHtmlBrowser } from './decodeHtmlBrowser'

export const parserOptions: ParserOptions = {
  isVoidTag,
  isNativeTag: tag => isHTMLTag(tag) || isSVGTag(tag),
  isPreTag: tag => tag === 'pre',
  decodeEntities: __BROWSER__ ? decodeHtmlBrowser : decodeHtml,

  isBuiltInComponent: (tag: string): symbol | undefined => {
    if (isBuiltInType(tag, `Transition`)) {
      return TRANSITION
    } else if (isBuiltInType(tag, `TransitionGroup`)) {
      return TRANSITION_GROUP
    }
  }
}
