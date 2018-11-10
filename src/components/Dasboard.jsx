import React, { Component } from 'react';
import Nav from './DasnoardNav';

export default class Dasboard extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="row wrapper">
                    <Nav/>
                    <main class="col bg-faded py-3">
                        <h2>Main</h2>
                        <p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape
            swag wolf squid tote bag. Tote bag cronut semiotics, raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade
            ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh
    synth chillwave meditation. Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>

                        <p>Ethical Kickstarter PBR
                        asymmetrical lo-fi. Dreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan
                        Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb
                        readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy
                        leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies,
    forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>
                    </main>
                </div>
            </div>
        )
    }
}
