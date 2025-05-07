
import React from 'react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  title: string;
  to: string;
  icon?: React.ReactNode;
}

const GameCard: React.FC<GameCardProps> = ({ title, to, icon }) => {
  return (
    <Link to={to} className="block">
      <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-poker-gold bg-black hover:bg-poker-gold/10 transition-all">
        {icon && (
          <div className="text-poker-gold mb-1 text-2xl">
            {icon}
          </div>
        )}
        <span className="text-sm font-bold text-center text-poker-gold">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default GameCard;
