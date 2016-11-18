describe("Simon gameLogic", function() {

  describe("createInitialMove", function() {
    it("is blank except for one expected move", function() {
      const initialMove: { [_: string]: any } = {
        endMatchScores: null,
        turnIndexAfterMove: 0,
        stateAfterMove: {
          expectedSequence: [jasmine.any(Number)],
          playerSequence: [],
          delta: null
        }
      };

      expect(gameLogic.createInitialMove()).toEqual(initialMove);
    });
  });

  describe("addToExpectedSequence", function() {
    let currentState: IState;
    let delta: number;

    it("adds one to color to the sequence", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [],
        delta: delta
      };

      let lengthBefore = currentState.expectedSequence.length;
      gameLogic.addToExpectedSequence(currentState);

      expect(lengthBefore).toEqual(2);
      expect(currentState.expectedSequence.length).toEqual(3);
    });
  });

  describe("checkSequenceMatchesExpected", function() {
    let currentState: IState;
    let delta: number;

    it("returns true when the player sequence is empty", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [],
        delta: delta
      };

      expect(gameLogic.checkSequenceMatchesExpected(currentState)).toEqual(true);
    });

    it("returns true when the player sequence matches the expected sequence so far", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [3],
        delta: delta
      };

      expect(gameLogic.checkSequenceMatchesExpected(currentState)).toEqual(true);
    });

    it("returns false when the player sequence is different than expected", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [1],
        delta: delta
      };

      expect(gameLogic.checkSequenceMatchesExpected(currentState)).toEqual(false);
    });
  });

  describe("getWinner", function() {
    let currentState: IState;
    let turnIndex: number;
    let delta: number;

    it("returns -1 if nobody has lost yet", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [],
        delta: delta
      };

      turnIndex = 1;

      expect(gameLogic.getWinner(currentState, turnIndex)).toEqual(-1);
    });

    it("returns 1 if player 0 has lost", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [1, 1],
        delta: delta
      };

      turnIndex = 0;

      expect(gameLogic.getWinner(currentState, turnIndex)).toEqual(1);
    });

    it("returns 0 if player 1 has lost", function() {
      currentState = {
        expectedSequence: [3, 0],
        playerSequence: [1, 1],
        delta: delta
      };

      turnIndex = 1;

      expect(gameLogic.getWinner(currentState, turnIndex)).toEqual(0);
    });
  });

  describe("createMove", function() {
    let stateBeforeMove: IState;
    let color: number;
    let turnIndexBeforeMove: number;
    let delta = 3;

    it("does not set endMatchScores if there is no winner", function() {
      stateBeforeMove = {
        expectedSequence: [3, 0],
        playerSequence: [],
        delta: delta
      };

      let answer = gameLogic.createMove(stateBeforeMove, color, turnIndexBeforeMove);
      expect(answer).toEqual(
        {
          endMatchScores: [0, 0],
          turnIndexAfterMove: -1,
          stateAfterMove: {
            delta: undefined,
            playerSequence: [undefined],
            expectedSequence: [3, 0]
          }
        }
      );
    });

    it("sets endMatchScores if there is no winner this round", function() {
      stateBeforeMove = {
        expectedSequence: [2, 1],
        playerSequence: [],
        delta: delta
      };

      let answer = gameLogic.createMove(stateBeforeMove, color, turnIndexBeforeMove);
      expect(answer).toEqual(
        {
          endMatchScores: [0, 0],
          turnIndexAfterMove: -1,
          stateAfterMove: {
            delta: undefined,
            playerSequence: [undefined],
            expectedSequence: [2, 1]
          }
        }
      );
    });

    it("clears the playerSequence and adds to the expectedSequence after a full successful turn", function() {
      stateBeforeMove = {
        expectedSequence: [2, 3],
        playerSequence: [2],
        delta: delta
      };

      let answer = gameLogic.createMove(stateBeforeMove, 3, turnIndexBeforeMove);

      expect(answer.stateAfterMove.playerSequence.length).toBe(0);
      expect(answer.stateAfterMove.expectedSequence.length).toBe(3);
    });

    it("if stateBeforeMove is falsy it calls getInitialState", function() {
      stateBeforeMove = null;

      let answer = gameLogic.createMove(stateBeforeMove, color, turnIndexBeforeMove);
      expect(answer).toEqual(
        {
          endMatchScores: [0, 0],
          turnIndexAfterMove: -1,
          stateAfterMove: {
            delta: undefined,
            playerSequence: [undefined],
            expectedSequence: [jasmine.any(Number)]
          }
        }
      );
    });
  });

  describe("checkMoveOk", function() {
    let stateTransition: IStateTransition;
    it("does nothing at the moment", function() {
      gameLogic.checkMoveOk(stateTransition);
      expect(true).toBe(true); // this is obviously just a placeholder
    });
  });
});
