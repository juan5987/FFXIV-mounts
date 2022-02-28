import React from 'react';
import '../styles/mount.scss';

const Mount = ({ mount }) => (
    <div key={mount.id} className="mount">
        <img className="mount__img" src={`https://xivapi.com${mount.Icon}`} />
        <strong className="mount__name">{mount.Name_fr}</strong>
    </div>
)

export default Mount;