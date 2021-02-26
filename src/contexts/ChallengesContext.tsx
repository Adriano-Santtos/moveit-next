import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body' | 'eye';
    description : string;
    amount: number;

}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: ()=> void;
    startNewChallenge: () => void;
    completeChallenge:() => void;
    activeChallenge: Challenge;
    resetChallenge: ()=> void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}:ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1)*4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []) // array vazio significa que a função será executada uma única vez

    function levelUp() {
        setLevel(level +1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor((Math.random()*challenges.length));
        const challenge = challenges[randomChallengeIndex];

    
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉 ', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){

            return; // return void, apenas para verificação

        }
        
        const {amount} = activeChallenge;
        
        let  finalExperience = currentExperience + amount;
        
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        
    }



    return (
        <ChallengesContext.Provider 
            value ={{
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            }}
            >
            {children}
        </ChallengesContext.Provider>
    );
}