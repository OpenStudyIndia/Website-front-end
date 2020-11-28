//imports react button.css and hashlink.
import React from 'react';
import './Button.css';
import { HashLink } from 'react-router-hash-link';

//preset styles
const STYLES = ['btn--main', 'btn--silhouette', 'btn--test', 'btn--square'];

//preset buttons.
const SIZES = ['btn--medium', 'btn--large'];

//this is bad practise, as you are not going to be passing all values, and chrome does not complain, neither does chromium. 
//but may cause memory leaks, it is just buttons so i don't worry

export const Button = ({
    children,//just gets whatever is supposed to go in text.
    type,//for type, 
    onClick,//on click, just returns itself, standard on click.
    buttonStyle,//choose the button style
    buttonSize,//button size, if you would like to change button size.
    path,//for using link or hashlink redirect to a part of site.
    offset,//if you would like to redirect using hash router, then you need offset to make sure whatever is at the top is ignored.
    bgcolor,//get an hex value, set it.
    disable //boolean to disable the button
}) => {
    //checks button style
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        //using hashlink here because it does work as a normal link router and a hash link router plus has extra stuff like scrolling, so it is better for this usecase.
        <HashLink to={path} className='btn-mobile' smooth scroll={el => { el.scrollIntoView(true); window.scrollBy(0, -offset) }}>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}//sets the classname
                style={{ backgroundColor: bgcolor }}//sets the style
                // {...console.log(children,type,buttonSize,buttonStyle,path,offset,bgcolor)} uncomment if you'd like to see the output. 
                onClick={onClick}//just returns itself for click
                disabled={disable}//if you want the button to be disabled, pass {true}
                type={type}//type of button, pretty useless, just needed once. is here if needed.
            >
                {children}{//just get the regular children that is the text that you pass <Button>in here</Button>.
                            }
            </button>
        </HashLink>
    );
};