import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
    return <div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/counter'>Counter</Link></li>
        </ul>
    </div>
}
