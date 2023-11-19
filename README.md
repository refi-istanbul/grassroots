![image](https://github.com/scaffold-eth/scaffold-eth-2/assets/19642322/67a13bdc-4dda-4b04-92d8-57bf2f88c6da)

## Inspiration

Grassroots allows users to share information on climate accountability and crimes, create dialogue to speak-up about the impact and potential investigations, and allows communities to raise funds for relief.
•	ETH Istanbul Demo: https://grassroot.vercel.app/

## Problem

We see several problems in the world related to concealed climate risks and reckless climate conduct:
1. Difficult to Report Climate Risks and Crimes: Weak reporting of violations of climate regulations means perpetrators act with impunity.  Whistleblowers risk all to get their voice heard and are many times silenced.
2. Communities face roadblocks to investigate:  Whistle blowers and their supporters face roadblocks to effectively investigate climate accountability.
3. Communities face difficulty to mitigate the climate impact: Communities are stripped of natural resources, habitats are destroyed, and local climate is changed before mitigating action can be taken.
   Solution:
4. A platform to report on Climate accountability:  Environmental and anti-corruption activists, whistle blowers, and reporters can use Grassroots to securely expose climate devastation – and those responsible. By fueling demands for change, this reporting is a vital step towards averting climate crises.
5. Crowdfund Climate Crime Investigations: Every post has the chance for users to raise additional points or an investigation.  Users can “speak-up” to a post to participate in the discussion or raise an   investigation.  The community of verified users can upvote or downvote posts based on.
6. Crowdfund Relief & Mitigants: Users can also raise funds via a relief campaign to urgently help mitigate the adverse climate actions.  This is done in  participation with local governing bodies if applicable.
      This highlights the crucial need to support whistleblowers in the fight against climate change. By taking action when complaints are first raised, donors and officials can safeguard vital projects from corruption – ensuring they achieve their goals.



## Target Users

*	Whistle blowers who want to report concealed climate risks.

*	Community members who want to support and investigate climate crimes and risks

*	Local governments and NGO’s who want to ensure that climate regulations are being followed

Grassroots is a dApp for climate accountability and a safe place for climate whistle blowers, where they can post with privacy and immutability to bring attention to and prevent issues of climate crimes before their true damage has set in. The site provides a simple user interface where anyone can post text and images to alert the community of climate harm. Posts can be up or down voted by the community.
We are tackling at the domain of reckless climate conduct, which can make climate change worse, concealed climate-related risks and other forms of corruption that fuel the climate crisis.


### Benefits:
Using Grassroots whistleblowers reporting concealed climate related risks can share their reports and case studies safely and anonymously.  They can connect to their communities to share the personal and community impact of climate change and climate crimes and the community can participate in voting on and speaking up about the whistle blower claims. As we build further, users will be able to raise funding for investigations and for relief in a solution-oriented approach to mitigate these climate risks before they advance.

Grassroots provides a platform for raising awareness in climate conduct for all stakeholders. This helps maximize the impact of climate regulations and proper use of climate funding to contain climate change and reduce its devastating effects on our planet.




### Who is this for:

Climate whistleblowers play an important role in revealing complex schemes designed to help companies evade climate scrutiny or maintain an unfair advantage. A climate change whistleblower is a person who discloses information about violations of law, gross mismanagement of funds, abuse of authority or other wrongdoing that exacerbates climate change. As with all other whistleblowers, climate change whistleblowers possess information about wrongdoing not generally known by the public and disclose this information for the purpose of rectifying the wrongdoing.

Integration with an existing Digital Public Good, Ushaidi

#### How we built it:

We built it using Next.js + wagmi for the front end, Waku for peer-to-peer messages and data storage and Mask Network for provable personhood. Tech stack

1.	Next.jsScaffold-ETH2 stack(Typescript/TailwindCSS/wagmi hooks)
2.	Waku JS SDK for peer-to-peer messaging and permanent off-chain data storage
3.	IPFS for community sourced images and on chain storage
4.	Mask Network REST API to fetch users ’identities
      We liked Waku, because it offered a safe, gassless and censorship resistant way of storing messages and communicating between different participants in the dApp. We liked Scaffold ETH because it came with a tech stack that was battle tested in dozens of hackathons previously, such as modern custom wagmi hooks, easy to pickup and manage Tailwind CSS and simple WalletConnect/Metamask wallet connection Challenges we ran into: Since Mask Networks ecosystem is a relatively new ecosystem to us, we had to familiarise ourselves with Proof and Relation services for identity verification and connecting the Mask Network’s Avatar to user’s different online identities, creating various authentication possibilities. We’ve read through the docs, talked to the staff at the Mask’s booth, connected with engineers on Telegram’s public group, but also a private one dedicated to our specific issue and we’ve further investigated the required steps to integrate Mask.

#### Here’s out code: 
* Custom Next.ID login component (https://github.com/refi-istanbul/client-dapp/blob/ main/packages/nextjs/components/grassroots/NextIdSignin.tsx) 

* Calling the Next.ID REST API (https://github.com/refi-istanbul/client-dapp/blob/ main/packages/nextjs/services/nextid/service.ts) In addition, coming to an agreement with liveliness of the local Waku node took a deeper investigation on how a local light node worked, but it was an exciting effort and we were glad to be able to build on it. After going through the examples and chatting to staff at Waku’s booth, we were able to fully adjust our code to work with the Waku local node.

## What's next for Grassroots:

With the right funding the project could continue to build and do the following:

1.	Conducting a market test and getting feedback from climate communities and climate organizations. We plan to start with the climate communities in Europe and on-board attendees, but having a global reach it can reach millions.
2.	Validate all assumptions and test in the field: Coordinate with different climate whistle blowing organizations, Unicef, and sample communities and see how the solution would work and gather feedback to see what needs to be better.
3.	Bring on more team members.

