from spellchecker import SpellChecker



def computeWordsFromRawPredictionStream(letterStreamData):
    outliersRemoved = []
    window = []
    lastChar = None
    for letter in letterStreamData:
        if letter == lastChar:
            window.append(letter)
        else:
            if len(window) > 5:
                # persistent character, wasn't an outlier
                outliersRemoved.extend(window)
            window.clear()
        lastChar = str(letter)

    if len(window) > 5:
        # persistent character, wasn't an outlier
        outliersRemoved.extend(window)

    runsRemoved = []
    lastChar = None
    for letter in outliersRemoved:
        if letter != lastChar:
            runsRemoved.append(letter)
        lastChar = str(letter)

    actionsApplied = []
    for letter in runsRemoved:
        letter = letter.lower()
        if letter == "space":
            actionsApplied.append(" ")
        elif letter == "delete" and actionsApplied:
            actionsApplied = actionsApplied[:-1]
        else:
            actionsApplied.append(letter)

    # TODO add text correction module
    textCorrection = " ".join([SpellChecker().correction(i) for i in "".join(actionsApplied).split(" ")])

    print("raw:", "".join(letterStreamData), "\n")
    print("outliers removed:", "".join(outliersRemoved))
    print("runs removed:", "".join(runsRemoved))
    print("actions applied:", "".join(actionsApplied))


    print("text correction applied gave final result of:", textCorrection)

    return textCorrection


if __name__ == '__main__':
    print( (['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'S', 'F', 'F', 'F', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'X', 'T', 'T', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'C', 'Z', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']))