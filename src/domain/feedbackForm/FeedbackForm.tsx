import React from "react";
import { TextInput, TextArea, Checkbox, Button, IconUpload } from "hds-react";

import A from "../../common/components/a/A";
import PlainList from "../../common/components/plainList/PlainList";
import Text from "../../common/components/text/Text";
import styles from "./feedbackForm.module.scss";

interface Props {
  fluid?: boolean;
}

function FeedbackForm({ fluid = false }: Props) {
  const [showContactDetailFields, setShowContactDetailFields] = React.useState(
    false
  );

  const handleWantReplyToggle = () => {
    setShowContactDetailFields((value) => !value);
  };

  const wantReplyValue = showContactDetailFields;

  return (
    <div
      className={[styles.feedbackFormContainer, !fluid ? styles.maxWidth : null]
        .filter((style) => style)
        .join(" ")}
    >
      <div className={styles.feedbackFormSection}>
        <Text variant="h1">Anna palautetta</Text>
        <Text>
          Anna palautetta verkkopalvelumme toiminnasta. Pyrimme vastaamaan
          viiden arkipäivän kuluessa. Voit lähettää viestisi nimettömänä. Jos
          haluat henkilökohtaisen vastauksen, jätä yhteistietosi.
        </Text>
      </div>
      <section className={styles.feedbackFormSection}>
        <Text variant="h2">Palaute</Text>
        <div className={styles.feedbackFormControlGrid}>
          <TextInput name="title" id="title" labelText="Otsikko" />
          <TextArea name="content" id="content" labelText="Palaute *" />
        </div>
      </section>
      <section className={styles.feedbackFormSection}>
        <Text variant="h2">Lisää liitetiedosto</Text>
        <Text>
          Voit lisätä halutessasi lisätä palautteeseen liitetiedoston,
          tiedostonjen maksimikoko on 5M
        </Text>
        <Button variant="secondary" iconLeft={<IconUpload />}>
          Lisää tiedosto
        </Button>
      </section>
      <div className={styles.feedbackFormSection}>
        <Checkbox
          name="want-reply"
          id="want-reply"
          checked={wantReplyValue}
          onChange={handleWantReplyToggle}
          labelText="Haluan vastauksen palautteeseeni"
        />
      </div>
      {showContactDetailFields && (
        <section className={styles.feedbackFormSection}>
          <Text variant="h2">Yhteystietosi</Text>
          <div className={styles.feedbackFormControlGrid}>
            <TextInput
              name="user-name"
              id="user-name"
              labelText="Nimi tai nimimerkki"
            />
            <TextInput
              name="user-email"
              id="user-email"
              labelText="Sähköpostiosoite"
            />
          </div>
        </section>
      )}
      <div className={styles.feedbackFormSection}>
        <Button type="submit">Lähetä palaute</Button>
      </div>
      <div className={styles.feedbackFormSection}>
        <Text>
          Koska tämän palautelomakkeen tietoturvaa ei ole varmistettu,
          palautteessanne ei ole syytä mainita esim. henkilötunnuksia,
          pankkitilin numeroja tai varallisuutta koskevia tietoja eikä myöskään
          arkaluontoisia tietoja kuten tietoja terveydentilasta tai asiakkuuteen
          liittyviä tietoja
        </Text>
        <Text>
          Sähköinen viesti toimitetaan viranomaiselle lähettäjän omalla
          vastuulla (Laki sähköisestä asioinnista viranomaistoiminnassa
          24.1.2003/13, 8 §). Jos asiakirjan toimittamiselle on asetettu
          määräaika, lähettäjän on huolehdittava siitä, että asiakirja saapuu
          viranomaiseen määräajassa (Hallintolaki 6.6.2003/434, 17 §).
        </Text>
        <Text>
          Tämän vuoksi palauteviestinä ei tule lähettää esimerkiksi
          lakisääteisiä muistutuksia, kanteluja tai oikaisuvaatimuksia
          päätöksistä.
        </Text>
        <PlainList
          items={[
            <A
              href="https://www.hel.fi/rekisteriseloste"
              target="tab"
              variant="camouflaged"
            >
              Palautejärjestelmän rekisteriseloste
            </A>,
            <A
              href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/ohjeita-palautteesta/"
              target="tab"
              variant="camouflaged"
            >
              Tietoa palautteen antamisesta
            </A>,
          ]}
        />
      </div>
    </div>
  );
}

export default FeedbackForm;
