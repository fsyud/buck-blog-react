import './index.less'
import { Component } from 'react'

interface SakuraState {
  show?: boolean;
}

export default class Sakura extends Component<SakuraState> {
  constructor(props: SakuraState) {
    super(props)
    this.state = {}
  }


}
