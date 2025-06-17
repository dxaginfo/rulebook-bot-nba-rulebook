import { Rule } from '../types/rule';

// Sample NBA rules data
const rulesData: Rule[] = [
  {
    id: 'rule-001',
    title: 'Traveling',
    category: 'Violations',
    section: 'Rule 10, Section XIII',
    content: 'A player who receives the ball while standing still may pivot, using either foot as the pivot foot. When a player gathers the ball while progressing, they may take two steps in coming to a stop, passing or shooting the ball. A player who comes to a stop on step one when both feet are on the floor may pivot using either foot as their pivot. If they jump with both feet they must release the ball before either foot touches the floor. A player who lands with one foot first may only pivot on that foot.',
    examples: [
      'If a player receives a pass while standing still, they can pivot on either foot without traveling.',
      'If a player is dribbling and picks up the ball while moving, they are allowed two steps to come to a stop, pass, or shoot.'
    ]
  },
  {
    id: 'rule-002',
    title: 'Shot Clock',
    category: 'Timing',
    section: 'Rule 7, Section II',
    content: 'The shot clock shall be 24 seconds in length with a 14-second reset provision. The team in possession must attempt a field goal before the shot clock expires. The shot clock shall be reset to 24 seconds as soon as the ball touches the rim or backboard, or when a team newly gains possession. If a team is awarded possession of the ball in the frontcourt as a result of a foul, kicked ball, etc., and 14 seconds or more remain on the shot clock, no reset occurs. If less than 14 seconds remain, the shot clock shall be reset to 14 seconds.',
    examples: [
      'If Team A shoots and hits the rim, the shot clock resets to 24 seconds when either team gains possession.',
      'If Team A has possession and Team B knocks the ball out of bounds in Team A\'s frontcourt with 10 seconds on the shot clock, the shot clock will reset to 14 seconds.'
    ]
  },
  {
    id: 'rule-003',
    title: 'Goaltending',
    category: 'Violations',
    section: 'Rule 11, Section I',
    content: 'Goaltending occurs when a player touches the ball during a field goal attempt while the ball is on its downward flight, entirely above the rim level, and has the possibility of entering the basket. It also occurs when a player touches the ball after it has touched the backboard and is above the rim level, whether or not the ball has a possibility of entering the basket. If a defensive player goaltends, the basket counts for the offensive team. If an offensive player goaltends, the basket is nullified.',
    examples: [
      'If a defender blocks a shot after it hits the backboard while the ball is above the rim, it\'s goaltending.',
      'If an offensive player tips in a teammate\'s shot while the ball is above the rim and still has a chance to go in, it\'s offensive goaltending.'
    ]
  },
  {
    id: 'rule-004',
    title: 'Court Dimensions',
    category: 'Equipment',
    section: 'Rule 1, Section I',
    content: 'The NBA playing court is 94 feet long and 50 feet wide, measured from the inner boundaries. The court is divided into two equal halves by the midcourt line. The three-point arc is 23 feet 9 inches from the center of the basket (22 feet in the corners). The free throw line is 15 feet from the face of the backboard. The key (free throw lane) is 16 feet wide. The backboard is 6 feet wide by 3.5 feet tall, with the rim 10 feet above the floor.',
    examples: [
      'The half-court line is exactly 47 feet from each baseline.',
      'The three-point line is closer to the basket in the corners (22 feet) than at the top of the arc (23 feet 9 inches).'
    ]
  },
  {
    id: 'rule-005',
    title: 'Personal Fouls',
    category: 'Fouls',
    section: 'Rule 12, Section I',
    content: 'A player is allowed six personal fouls per game before being disqualified (fouled out). A personal foul is illegal physical contact that impedes the progress of an opponent. Common types include pushing, holding, charging, blocking, and hand-checking. If a player is in the act of shooting when fouled, they receive free throws: two for a regular field goal attempt, three if beyond the three-point line. If not shooting, the team receives possession or enters the bonus situation if applicable.',
    examples: [
      'If a defender pushes an offensive player who is dribbling, it\'s a personal foul.',
      'If a player commits their sixth personal foul, they are disqualified for the remainder of the game.'
    ]
  },
  {
    id: 'rule-006',
    title: 'Out of Bounds',
    category: 'Violations',
    section: 'Rule 8, Section I',
    content: 'The ball is out of bounds when it touches a player who is out of bounds or any other person, the floor, or any object on, above or outside of a boundary line. If the ball goes out of bounds, it is awarded to the opponent of the team or player who last touched it before it went out. If two opponents touch it simultaneously before it goes out, a jump ball is called. For a player to save a ball from going out of bounds, the player must be in bounds when touching the ball and establish control before going out of bounds.',
    examples: [
      'If a player with the ball steps on the sideline, the ball is out of bounds and awarded to the opposing team.',
      'If a defensive player deflects a pass and the ball then goes out of bounds, the offensive team retains possession.'
    ]
  },
  {
    id: 'rule-007',
    title: 'Three-Second Violation',
    category: 'Violations',
    section: 'Rule 10, Section VII',
    content: 'An offensive player cannot remain in the free throw lane (the paint) for more than three consecutive seconds while their team is in possession of the ball in the frontcourt. The count resets when the player leaves the lane, when a shot is attempted, or when the ball leaves the offensive team\'s possession. Defensive players are also subject to a three-second violation if they remain in the lane without actively guarding an opponent.',
    examples: [
      'If an offensive player stands in the paint for 4 seconds without leaving, it\'s a three-second violation.',
      'If a player is in the paint for 2 seconds, steps out, then immediately steps back in, the count starts over.'
    ]
  },
  {
    id: 'rule-008',
    title: 'Double Dribble',
    category: 'Violations',
    section: 'Rule 10, Section II',
    content: 'A player cannot dribble a second time after their first dribble has ended, unless in between the two dribbles they lost control of the ball due to a shot, a pass, or a touch by another player. If a player ends their dribble by catching or causing the ball to come to rest in one or both hands, they must pass or shoot before dribbling again, or it\'s a double dribble violation.',
    examples: [
      'If a player picks up their dribble, holds the ball, and then starts dribbling again, it\'s a double dribble.',
      'If a player\'s pass is deflected back to them and they dribble again, it\'s legal because possession was interrupted.'
    ]
  },
  {
    id: 'rule-009',
    title: 'Flagrant Fouls',
    category: 'Fouls',
    section: 'Rule 12, Section IV',
    content: 'Flagrant fouls are classified as either Flagrant Foul Penalty 1 or Flagrant Foul Penalty 2. A Flagrant Foul Penalty 1 is unnecessary contact committed by a player against an opponent. A Flagrant Foul Penalty 2 is unnecessary and excessive contact committed by a player against an opponent. Flagrant 1 results in two free throws and possession. Flagrant 2 results in two free throws, possession, and an automatic ejection. Players accumulating flagrant foul points during the season are subject to suspension.',
    examples: [
      'If a player winds up and strikes an opponent across the face while contesting a shot, it\'s likely a Flagrant 2.',
      'If a player makes a play on the ball but follows through with excessive contact, it might be ruled a Flagrant 1.'
    ]
  },
  {
    id: 'rule-010',
    title: 'Backcourt Violation',
    category: 'Violations',
    section: 'Rule 10, Section IX',
    content: 'Once the ball and both feet of the player in possession have been established in the frontcourt, they cannot return the ball to the backcourt. If they do, it results in a backcourt violation and the opposing team is awarded the ball. Exceptions include if the ball is deflected by a defensive player, during a jump ball, or on a rebound after a shot where the ball touches the backboard or rim.',
    examples: [
      'If a player dribbles from backcourt to frontcourt, then dribbles back to backcourt, it\'s a violation.',
      'If a player catches a pass in the frontcourt and their momentum carries them to the backcourt, it\'s a violation.'
    ]
  }
];

export default rulesData;