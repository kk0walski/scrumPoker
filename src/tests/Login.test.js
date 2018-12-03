import Navigation from "../components/Navigation";
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { firebase } from "../firebase/firebase";
import configureStore from "../store/configureStore";

const store = configureStore();
let wrapper;

Enzyme.configure({
    adapter: new Adapter()
});

describe('handleSignout', () => {
    beforeAll(function () {
        firebase.auth = jest.fn().mockReturnValue({
            currentUser: true,
            signOut: function () {
                return true;
            }
        });
    });
    it("should return true", async () => {
        wrapper = Enzyme.shallow(< Navigation store={store}/>).dive();
        let result = await wrapper.instance().handleLogOut();
        expect(result).toBe(true)
    });
});