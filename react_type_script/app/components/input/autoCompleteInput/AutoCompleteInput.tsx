/*
 * Copyright (c) 2020. Prototype
 */

import React, { ChangeEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import ReactAutocomplete from 'react-autocomplete';
import styles from './style.scss';
import cn from 'classnames';

export type AutoCompleteInputProps = {
  id?: string;
  placeholder?: string;
  showResetBtn?: boolean;
  autocompleteItems: string[];
  onAutocompleteSelect: (param: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
};

type State = {
  value: string;
};

type AutoCompleteItem = {
  id: string;
  label: string;
};

class AutoCompleteInput extends React.Component<AutoCompleteInputProps, State> {
  constructor(props: AutoCompleteInputProps) {
    super(props);

    this.state = {
      value: '',
    };

    this.clearValue = this.clearValue.bind(this);
    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
    this.handleAutocompleteSelect = this.handleAutocompleteSelect.bind(this);
  }

  clearValue() {
    const { onAutocompleteSelect, disabled } = this.props;

    if (disabled) return false;

    this.setState({ value: '' }, () => {
      onAutocompleteSelect('');
    });
  }

  handleAutocompleteChange(e: ChangeEvent<HTMLInputElement>) {
    const { autocompleteItems, disabled, onAutocompleteSelect } = this.props;

    if (disabled || !autocompleteItems.length) return false;

    const value: string = e.target.value;
    const isBecameEmpty: boolean = Boolean(this.state.value.length && !value);

    this.setState({ value }, () => {
      if (isBecameEmpty) onAutocompleteSelect(value);
    });
  }

  handleAutocompleteSelect(value: string) {
    const { autocompleteItems, disabled, onAutocompleteSelect } = this.props;

    if (disabled || !autocompleteItems.length) return false;

    this.setState({ value }, () => {
      onAutocompleteSelect(value);
    });
  }

  render() {
    const { value } = this.state;
    const { id, autoFocus, showResetBtn, autocompleteItems, placeholder, disabled } = this.props;
    const uniqueItems: AutoCompleteItem[] = Array.from(new Set([...autocompleteItems])).map(i => ({
      id: i,
      label: i,
    }));

    const rootClasses = cn(styles.root, {
      [styles.rootDisabled]: !uniqueItems.length || disabled,
    });

    return (
      <div id={id} className={cn(rootClasses)}>
        <div className={styles.contentWrap}>
          <div className={styles.autocompleteField}>
            {placeholder && !value && <div className={styles.autocompletePlaceholder}>{placeholder}</div>}

            <ReactAutocomplete
              inputProps={{
                autoFocus,
              }}
              items={value ? uniqueItems : []}
              shouldItemRender={(item, value) => item.label.toLowerCase().includes(value.toLowerCase())}
              getItemValue={item => item.label}
              wrapperStyle={{
                display: 'block',
                width: '100%',
                height: '40px',
                padding: '0 3px 0 0',
              }}
              renderMenu={this.renderMenu}
              renderItem={this.renderMenuItem}
              value={value}
              onChange={this.handleAutocompleteChange}
              onSelect={this.handleAutocompleteSelect}
            />

            {showResetBtn && value && <div onClick={this.clearValue} className={styles.autocompleteResetBtn} />}
          </div>
        </div>
      </div>
    );
  }

  renderMenu(items: ReactNode[]) {
    return <div className={styles.autocompleteList}>{items}</div>;
  }

  renderMenuItem(item: AutoCompleteItem, highlighted: boolean) {
    return (
      <div
        key={item.id}
        className={styles.autocompleteListItem}
        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
      >
        {item.label}
      </div>
    );
  }

  static propTypes: {};
  static defaultProps: {};
}

export default AutoCompleteInput;

AutoCompleteInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  showResetBtn: PropTypes.bool,
  autocompleteItems: PropTypes.arrayOf(PropTypes.string),
  onAutocompleteSelect: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
};

AutoCompleteInput.defaultProps = {
  id: 'autoCompleteInput',
  placeholder: 'Введите текст',
  showResetBtn: true,
  autocompleteItems: [],
  onAutocompleteSelect: () => ({}),
  autoFocus: true,
  disabled: false,
};
