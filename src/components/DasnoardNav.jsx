import React, { Component } from 'react'

export default class DasnoardNav extends Component {
  render() {
    return (
        <aside class="col-12 col-sm-3 p-0 bg-light">
        <nav class="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">
            <a class="navbar-brand" href="#"><i class="fa fa-bullseye fa-fw"></i> Dashboard</a>
            <a href class="navbar-toggler" data-toggle="collapse" data-target=".sidebar">
                <span class="navbar-toggler-icon"></span>
            </a>
            <div class="collapse navbar-collapse sidebar">
                <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Saved games</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Create game</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Saved lists</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Create List</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">My Account</a>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
    )
  }
}
